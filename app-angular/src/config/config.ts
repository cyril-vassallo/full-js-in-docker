import { environment } from '../environments/environment'

export const config = {
    apiUrl: 'http://localhost:8080',
    apiGithub: 'https://api.github.com/',
    navigation: '/navigation',
    login: '/user/login',
    getUser: '/user/',
    getUsers: '/user/all/',
    getUserTasks: '/task/user/',
    getLastCreatedTasksId: '/task/last/',
    postTask : '/task/',
    updateTask : '/task/',
    getUserGithub : '/github/user/',
    postUserGithub: '/github/'
}

if (environment.production) {
    config.apiUrl =  'https://api-taskiteam.io'
}
