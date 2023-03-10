const TaskForm = ({ name, createTask, updateTask, handleInputChange, isEdit }) => {
  return (
    <form className = "task-form" onSubmit = { isEdit ? updateTask : createTask }>
      <input type="text"
      placeholder="Add Task"
      name="name"
      value={ name }
      onChange={ handleInputChange }
      />
      <button type="submit">{ isEdit ? 'Edit' : 'Add'}</button>
    </form>
  )
}

export default TaskForm