import Link from "next/link";

const NavigationHeader = () => {
  return (
    <header className="bg-blue-300 shadow-xl text-gray-700 p-5 w-full grid grid-cols-[10rem_1fr] items-center justify-center">
      <div>
        <span>icon</span>
      </div>
      <ul className="flex items-center justify-evenly">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Account</Link>
        </li>
        <li>
          <Link href="/activity">Acivity</Link>
        </li>
        <li>
          <Link href="/cards">Cards</Link>
        </li>
      </ul>
    </header>
  );
};

export default NavigationHeader;
