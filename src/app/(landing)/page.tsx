import ApiKeyCard from "./components/ApiKeyCard";
import DataListProvider from "./components/DataListProvider";
import Quotes from "./components/Quotes";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 align-baseline w-full px-4 py-16">
      <ApiKeyCard />
      <Quotes />
      <DataListProvider />
    </div>
  );
}
