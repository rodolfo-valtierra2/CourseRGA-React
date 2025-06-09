import { Project } from '../utils/Project.ts';
const baseUrl = 'http://localhost:3000';
const url = `${baseUrl}/proyects`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Project[] {
  let projects: Project[] = data.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

function getToken () {
  return window.localStorage.session;
}

const projectAPI = {
  get(page = 1,sort='', limit = 20) {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=${sort}`, {
      headers: {
        'Authorization': 'bearer '+getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },
	put(project: Project) {
    return fetch(`${url}/${project._id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Authorization': 'bearer '+getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error creating the project. Please try again.'
        );
      });
	},
  post(project: Project) {
    return fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Authorization': 'bearer '+getToken(),
        'Content-Type': 'application/json'
      }
    })
	},
	find(id: string) {
    return fetch(`${url}/${id}`, {
      headers: {Authorization: 'bearer '+getToken(),}
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModel);
  },
  deleteById(id: string | undefined) {
    return fetch(`${url}/${id}`, {
			'method': 'DELETE',
			'Authorization': 'bearer '+getToken()
		})
    .catch(error => {
      console.log(error)
      alert("There was an error trying to delete")
      throw new Error ("There was a error deleting")
    })
  }
};

export { projectAPI };
