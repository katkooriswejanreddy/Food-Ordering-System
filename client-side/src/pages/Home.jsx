import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import FoodCard from "../components/FoodCard";

export default function Home() {
  return (
    <div className="p-4">
      <Hero />

      <SectionTitle title="Popular Dishes" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <FoodCard
          name="Burger"
          price={150}
          img="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
        />

        <FoodCard
          name="Pizza"
          price={250}
          img="https://images.unsplash.com/photo-1601924928585-0067f92f7a3c?auto=format&fit=crop&w=800&q=80"
        />

        <FoodCard
          name="Biryani"
          price={180}
          img="https://images.unsplash.com/photo-1631515243341-04f54e813e5d?auto=format&fit=crop&w=800&q=80"
        />
      </div>
    </div>
  );
}
