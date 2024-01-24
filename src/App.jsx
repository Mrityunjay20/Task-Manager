import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import {useState} from 'react'
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[],
  });

  function handleAddTask(text){
    
   
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text:text,
        projectId: prevState.selectedProjectId,
        id:taskId,
      }
      return{
        ...prevState,
        tasks:[newTask, ...prevState.tasks]
      }
    })
  }
  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task)=>task.id !== id)
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId:id,
      };
    })
  }

  function handleStartAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId:null,
      };
    })
  }

  function handleAddProject(projectData){
    const newProject = {
      ...projectData,
      id: Math.random()
    }
    setProjectsState(prevState => {
      return{
        ...prevState,
        selectedProjectId: undefined,
        projects:[...prevState.projects, newProject]
      }
    })
  }
  function handleStopAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId:undefined,
      };
    })
  }
  
  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project)=>project.id !== prevState.selectedProjectId)
      };
    })
  }

  const selectedProject = projectsState.projects.find( project => project.id === projectsState.selectedProjectId);
  const selectedProjectTasks = projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId);


  let content = 
  <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask} 
  onDeleteTask={handleDeleteTask} 
  tasks={selectedProjectTasks}
  
  />;
  if(projectsState.selectedProjectId === null){
    content= <NewProject onAdd={handleAddProject} removeProjectFunction={handleStopAddProject}/>
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }



  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectsState.projects}
      onSelectProject={handleSelectProject}
      selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
