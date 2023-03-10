const TaskStatus = ({ tasksLength, cTasksLength }) => {
  return (

    <>
      <div className="--flex-between --pb">
        <p>
          <b>Total Tasks</b> {tasksLength}
        </p>
        <p>
          <b>Completed Tasks</b> {cTasksLength}
        </p>
      </div>
      <hr />
    </>
  );
};

export default TaskStatus;
