const TaskForm = ({ name, createTask, handleInputChange }) => {
  return (
    <form className = "task-form" onSubmit = { createTask }>
      <input type="text"
      placeholder="Add Task"
      name="name"
      value={ name }
      onChange={ handleInputChange }
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm