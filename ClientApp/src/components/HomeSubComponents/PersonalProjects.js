import React, { Component } from 'react';

import { ProjectDetailsSpace } from './PersonalProjectsSubComponents/ProjectDetailsSpace';
import { ProjectsSpace } from './PersonalProjectsSubComponents/ProjectsSpace';
import { TaskBar } from './PersonalProjectsSubComponents/TaskBar';

import './PersonalProjects.css';

export class PersonalProjects extends Component {
    static displayName = PersonalProjects.name;

 constructor(props) {
     super(props);
     this.state = { article: 0, website: 'github', loading: true};
     this.getInfoAboutRepositories();
     this.handleArticleChange = this.handleArticleChange.bind(this);
    }

    handleArticleChange(e,val) {
        let article = this.state.article;
        if (article + 1 < this.state.repositories.length && val == 1) {
            this.setState({ article: article + 1 });
        }
        else if (article > 0 && val == -1) {
            this.setState({article: article - 1});
            }
    }

    static renderRepositoriesOverview(repositories, article, handleArticleChange) {
        return (
            <div><div id="TaskBar&title">
                <TaskBar />
                <h2 style={{ textAlign: "center", verticalAlign: "middle" }}>
                    Projects I have made</h2>
            </div><ProjectsSpace title={repositories[article].title} overview={repositories[article].overview} photo={repositories[article].photo}
                    maxArticle={repositories.length} article={article} onArticleChanged={handleArticleChange}
                />

                <div id="ProjectDetailsDiv">
                    <ProjectDetailsSpace url={repositories[article].url} description={repositories[article].description} />
                </div></div>
            );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : PersonalProjects.renderRepositoriesOverview(this.state.repositories, this.state.article, this.handleArticleChange);
      return (
          <div id="wrapper">
              {contents}
          </div>
    );
    }

    async getInfoAboutRepositories(){
        const apiResponse = await fetch("GitHub");
        const data = await apiResponse.json();
        const stop = 11 + 11;
        this.setState({ repositories: data, loading: false });
    }
}
