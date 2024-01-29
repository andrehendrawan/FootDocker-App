import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search(value: string) {
  return (
    <>
      <input type="text" placeholder="Search products..." className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500 w-full mr-2" />
      <button className="px-4 py-2 bg-slate-500 hover:bg-slate-900 text-white rounded-md flex items-center">
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
        Search
      </button>
    </>
  );
}
