import Cards from "./Cards"

export default function CardsGrid({ filteredNews }) {
  return (
    <div
      id="news"
      className="grid gap-6 px-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5"
      style={{ color: "#017276" }}
    >
      {filteredNews.map((item, index) => (
        <Cards
          key={item.id}
          news={item}
          index={index}
        />
      ))}
    </div>
  )
}
