using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GraphQL.Client.Http;
using GraphQL;
using System.Text.Json;
using GraphQL.Client.Serializer.Newtonsoft;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PortfolioSite.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GitHubController : ControllerBase
    {
        private readonly ILogger<GitHubController> _logger;

        public GitHubController(ILogger<GitHubController> logger)
        {
            _logger = logger;
        }
        
        [HttpGet]
        public async Task<string> Get()
        {
            // ADD THE TOOOKEN!!!!!!!!!
            var token = "";
            var graphQLClient = new GraphQLHttpClient("https://api.github.com/graphql", new NewtonsoftJsonSerializer());
            graphQLClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
            var owner = "anshans";

            GraphQLRequest repositoriesRequest = new GraphQLRequest
            {
                Query = @" query  {
                    user(login: ""anshans"") {
                     repositories(first: 100, privacy: PUBLIC) {
                    edges {
                    node {
                    id
             name
                }
            }
            }
            }
            }
            "
            };
            var result = await graphQLClient.SendQueryAsync<RepositoriesRequest>(repositoriesRequest);
            var listOfRepos = result.Data.user.repositories.edges;

            var DataAboutRepositories = new List<resultObj>();
            foreach (var repo in listOfRepos)
            {
                var name = repo.node.name;
                GraphQLRequest detailsRequest = new GraphQLRequest

                {
                    Query = @"query detale {
                    repository(name: """ + name + @""" , owner: """ + owner + @""") {
                        id
                        title: description
                        url
                        details: object(expression: ""master:README.md"") {
                            id... on Blob{
                                text
                              }
                        }
                    }
                }"
                };

                var resultRepositoryDetail = await graphQLClient.SendQueryAsync<DetailsRequest>(detailsRequest);

                var repository = new resultObj();
                repository.title = name;
                repository.url = resultRepositoryDetail.Data.repository.url;
                var OverviewAndDetails = extract(resultRepositoryDetail.Data.repository.details.text);

                if (OverviewAndDetails.ContainsKey("overview")) repository.overview = OverviewAndDetails["overview"];
                else repository.overview = "";
                if (OverviewAndDetails.ContainsKey("description")) repository.description = OverviewAndDetails["description"];
                else repository.description = "";
                if (OverviewAndDetails.ContainsKey("photo")) repository.photo = OverviewAndDetails["photo"];
                else repository.photo = "";

                DataAboutRepositories.Add(repository);
            }
            DataAboutRepositories.Reverse();
            return JsonSerializer.Serialize(DataAboutRepositories);
        }



        // BUSSINES LOGIC
        static public Dictionary<string, string> extract(string text)
        {
            Dictionary<string, string> OverviewAndDetails = new Dictionary<string, string>();

            //Extracting overview and description from text file
            //If there is no text that matches the regex'es then dictionary strings are set to null.

            Regex overviewRx = new Regex(@"# Overview:\n(?<word>[\W\w\s\+\-]+)\n# Details:");
            Regex detailsRx = new Regex(@"# Details:\n(?<word>[\W\w\s\+\-]+)$");
            Regex photoRx = new Regex(@"^\[\!\[\]\((?<word>\S*)\)\]\(\#\)");

            MatchCollection overview = overviewRx.Matches(text);
            MatchCollection details = detailsRx.Matches(text);
            MatchCollection photo = photoRx.Matches(text);


            foreach (Match match in overview)
            {
                GroupCollection groups = match.Groups;
                OverviewAndDetails.Add("overview", groups["word"].Value);
            }
            foreach (Match match in details)
            {
                GroupCollection groups = match.Groups;
                OverviewAndDetails.Add("description", groups["word"].Value);
            }
            foreach (Match match in photo)
            {
                GroupCollection groups = match.Groups;
                OverviewAndDetails.Add("photo", groups["word"].Value);
            }
            return OverviewAndDetails;
        }
    }
        
}