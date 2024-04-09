const Profile = (props) => {
  return (
    <>
    <div className='mt-8 p-1 w-9/12 h-28 rounded-lg shadow dark:bg-stone-500 '>
        <div className='flex flex-col items-center pb-10'>
        <img className="w-10 h-10 rounded-full shadow-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGu25NUfY-14F9gNq61oR5GTvfjy4lzfEvsj8dUCcoHQ&s" alt="Bonnie image"/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.name}</h5>
       
        </div>
    </div>
    
    </>
  )
}

export default Profile


