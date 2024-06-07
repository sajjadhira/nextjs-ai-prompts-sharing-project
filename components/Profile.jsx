import PromptCard from "./PromptCard"

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <div className="w-full">

      <div className="text-center">
        <h1 className="head_text">
          <span className="blue_gradient">{name} Profile</span>
          </h1>
      </div>
        <div className="mt-10 prompt_layout">
          {
            data.map((prompt, index) => {
              return (
                <PromptCard
                key={prompt._id}
                prompt={prompt}
                handleEdit={handleEdit && handleEdit(prompt)}
                handleDelete={handleDelete && handleDelete(prompt)}
                />
              )
            })
          }
        </div>
    </div>
  )
}

export default Profile