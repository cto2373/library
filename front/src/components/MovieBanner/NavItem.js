export default function NavItem({ sortName, setSort, isActive, children }) {

  const sort = (name) => {
    setSort(name)
    console.log(sortName);
  }
  
  return (
    <li >
      <button
        type="button"
        onClick={() => sort(sortName)}
        className={`block px-3 py-2 rounded-md ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-50 text-black'}`}
      >
        {children}
      </button>
    </li>
  )
}
