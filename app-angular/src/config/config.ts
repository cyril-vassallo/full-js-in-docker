import { environment } from '../environments/environment'

export const config = {
    apiUrl: 'http://localhost:8080',
    apiGithub: 'https://api.github.com/',
    navigation: '/navigation',
    user: '/user/',
    users: '/user/all/',
    login: '/user/login',
    getUserTasks: '/task/user/',
    getLastCreatedTasksId: '/task/last/',
    postTask : '/task/',
    getUserGithub : '/github/',
    postUserGithub: '/github/user'
}

if (environment.production) {
    config.apiUrl =  'https://api-taskiteam.io'
}
