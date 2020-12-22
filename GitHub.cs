using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PortfolioSite.Controllers
{
    //Structure for respositories list
    public class RepositoriesRequest
    {
        public User user { get; set; }
    }
    public class User
    {
        public Repositories repositories { get; set; }
    }
    public class Repositories
    {
        public List<Edge> edges { get; set; }
    }
    public class Edge
    {
        public Node node { get; set; }
    }
    public class Node
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    //Structure for details of repository
    public class DetailsRequest
    {
        public RepositoryHeader repository { get; set; }
    }
    public class RepositoryHeader
    {
        public string id { get; set; }
        public string title { get; set; }
        public string url { get; set; }
        public RepositoryDetails details { get; set; }
    }
    public class RepositoryDetails
    {
        public string id { get; set; }
        public string text { get; set; }
    }

    public class resultObj
    {
        public string title { get; set; }
        public string url { get; set; }
        public string overview { get; set; }
        public string description { get; set; }
        public string photo { get; set; }
    }
}
