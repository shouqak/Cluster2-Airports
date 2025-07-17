import heroImage from "../assets/hero.png"

export default function Hero() {
  return (
    <section
      className="relative h-64 bg-center bg-cover md:h-96"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-white/10"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="mb-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Stay Informed. Stay Connected.
        </h1>
        <p className="max-w-lg mb-4 text-lg text-white md:text-xl">
          Latest updates from Cluster2 Airports
        </p>

        <a
          href="#news"
          className="mt-2 px-6 py-2 rounded-full bg-[#017276] text-white font-medium hover:bg-[#00b0b9] transition"
        >
          Explore News
        </a>
      </div>
    </section>
  )
}
