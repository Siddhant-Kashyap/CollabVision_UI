 const Features = () => {
  const array = [
    "Seamless Project Management",
    "Integrated Video Call Collaboration",
    "Task Workflow Customization",
    "Advanced Task Management Features",
    "Enhanced Collaboration and Productivity"
  ];

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="w-2/4 h-2/4 border border-purple-600 rounded-2xl shadow-purpleshade p-4">
        <h2 className="text-3xl font-bold font-kodemono text-orange-500 text-center mb-4">Key Features</h2>
        <ul className="list-none text-yellow-100 font-robotomono text-xl ml-4 text-center">
          {array.map((value, index) => (
            <li  key={index} className="mb-2">{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Features