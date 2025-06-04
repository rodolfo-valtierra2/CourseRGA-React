import { useEffect, useState } from 'react';
import { projectAPI } from '../Requests/ProjectAPI.ts';
import ProjectDetail from './ProjectDetail';
import type { Project } from '../utils/Project.ts';
import { useParams } from 'react-router';

function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const params: any = useParams();

  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(params.id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <div>
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        <div className="row">
          {error && (
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error.message}
                </p>
              </section>
            </div>
          )}
        </div>

        {project && <ProjectDetail project={project} />}
      </>
    </div>
  );
}

export default ProjectPage;
