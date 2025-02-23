import { Link, useNavigate } from "react-router-dom";
import { InfiniteMovingImages } from "./ui/InfiniteMovingImages";
import { Subscription, getFeaturedLaptops } from "../util/ApiFunctions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./auth/AuthProvider";

const LandingPage = () => {

  const logos = [
    "https://imgs.search.brave.com/Gnyn9MCkKY4SGsiUhrMNF0Hm6cl93VmgktCYHgg4R4c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQzL0hQX2xvZ29f/MjAwOC5zdmc", // MSI
    "https://imgs.search.brave.com/PWK_2Lf7HMWXNpuk9jKfkyVJBsxRpmJLZf4TnpKDNEI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAz/L0xlbm92by1Mb2dv/LTEtNTAweDMxMy5w/bmc", // ASUS
    "https://imgs.search.brave.com/HvrU6fLGAyKAxiilTW79xtEcBVJVg-U1l4KgX0MyxmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy82/MTNiNjU4NDMwZTg1/MzAwMDRiYTNhMDcu/cG5n", // HP
    "https://imgs.search.brave.com/1bhL6ufZamxoV5Ikhs9IXvQoGD4DPumk9Nh2polNLQ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEw/L0FwcGxlX2xvZ29f/Z3JleS02MjR4NDAw/LnBuZw", // Dell
    "https://imgs.search.brave.com/hNbTcDhjZusEEMORHDHuTUIDkQMMRI3LoEip3NU6Zfw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8w/LzAwL0FjZXJfMjAx/MS5zdmc", // Apple
    "https://imgs.search.brave.com/UY9_91ROwwKYQUVhZJ3EZj9ei7MEjdVwRbfeNygIUSM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d29ybGR2ZWN0b3Js/b2dvLmNvbS9sb2dv/cy9hc3VzLWxvZ28t/MS5zdmc", // Acer
    "https://imgs.search.brave.com/xNJN85SpZqngrI10XQV0bVOe7IdqwhD0PL9gh-_m-NY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQ4L0RlbGxfTG9n/by5zdmc",// Lenovo
  ];

  const [featuredLaptops, setFeaturedLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionEmail, setsubscriptionEmail] = useState(null);
  const navigate = useNavigate();
  const { state } = useAuth();
  const { user } = state;

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const data = await getFeaturedLaptops();
        setFeaturedLaptops(data);
        console.log(featuredLaptops)
      } catch (error) {
        console.error("Failed to fetch laptops:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      toast.error("User not logged in",  {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    if (validateEmail(subscriptionEmail)) {
      try {
        const checkSubscription = await Subscription(subscriptionEmail);
        if (checkSubscription) {
          toast.success("Subscription successfull", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
          setsubscriptionEmail("");
        } else {
          toast.error("Subscription already present", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
        }
      }
      catch (error) {
        console.error("subscription failed:", error);
      }
    } else {
      toast.error("Enter a valid email", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };


  const ViewLaptop = (laptopId) => {
    navigate(`/laptop-details/${laptopId}`);
  };


  return (
    <div className="bg-gray-950 text-gray-300 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-gray-950 to-black text-gray-100 ">
        <div className="  md:max-w-[95vw] mx-auto flex flex-col md:flex-row items-center justify-between  px-6 py-16 ">
          {/* Hero Content */}

          <div className="">
            <h1 className="text-[40px] md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
              Find Your Perfect Laptop
            </h1>
            <p className="mt-6 text-lg md:text-xl font-thin text-gray-400">
              Discover the best laptops for gaming, work, and creativity.
              Built for performance, tailored <br/>for you.
            </p>
            <div className="mt-8 md:mt-12 flex space-x-4 mb-8">
              <Link to={"/shopping-cart"}>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-900 transition font-medium text-lg">
                  Shop Now
                </button>
              </Link>

            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full max-w-[70vw] md:max-w-[30vw] min-h-[20vh] md:min-h-[60vh] mt-4 md:mt-12 lg:mt-0 flex justify-center items-center overflow-hidden  ">
              <img
                src="images/laptopHero1.png"
                alt="Laptop Showcase"
                className="rounded-lg shadow-lg transition-all duration-1000 transform hover:scale-105 opacity-80"
                loading="lazy"
              />            
          </div>

        </div>

        <div className="flex justify-center">
          <InfiniteMovingImages
            items={logos}
            direction="left"
            speed="fast"
            pauseOnHover={true}
            className="w-full max-w-[92vw] md:max-w-[90vw]"
          />
        </div>

        {/* Background Design */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-700 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-700 rounded-full blur-3xl opacity-20"></div>
      </header>

      {/* Featured Products */}
      <section className="w-full mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-100 mb-10">
          Featured Laptops
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading State - Skeleton
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-full bg-gray-900 rounded-lg shadow-md animate-pulse"
              >
                {/* Skeleton for Image */}
                <div className="h-48 sm:h-64 md:h-80 bg-gray-700 rounded-t-lg p-5"></div>
                <div className="px-6 pt-3 pb-4">
                  {/* Skeleton for Title */}
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  {/* Skeleton for Price */}
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  {/* Skeleton for Features */}
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                  </div>
                  {/* Skeleton for Button */}
                  <div className="mt-6 w-full h-10 bg-blue-600 rounded-lg"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual Content
            featuredLaptops.map((laptop, index) => (
              <div
                key={index}
                className="w-full bg-gray-900 rounded-lg shadow-md hover:shadow-lg border border-gray-950 hover:border-gray-600 transition transform"
              >
                
                {/* Image */}
                <img
                  src={laptop.imageUrl}
                  alt={laptop.name}
                  className="w-full h-64 md:h-72 xl:h-80 2xl:h-[370px] object-fill rounded-t-lg p-5 max-w-sm lg:max-w-lg mx-auto"
                />
                <div className="px-6 pt-3 pb-4">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-300">{laptop.name}</h3>
                  {/* Price */}
                  <p className="mt-2 text-lg font-bold text-blue-400">{laptop.price}</p>
                  <ul className="mt-4 space-y-1">
                    {/* Features */}
                    <li className="text-gray-400 text-sm">• {laptop.processor}</li>
                    <li className="text-gray-400 text-sm">• {laptop.graphicsCard}</li>
                    <li className="text-gray-400 text-sm">• {laptop.displayDetails}</li>
                  </ul>
                  {/* Buy Now Button */}
                  <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    onClick={() => ViewLaptop(laptop.id)}>
                    View Model
                  </button>
                </div>
              </div>
            ))
          )}
        </div> 
      </section>


      {/* Call-to-Action Section */}
      <section className="bg-black text-gray-100 py-16 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Stay Updated with the Latest Deals</h2>
          <p className="mt-4 text-base text-gray-300">
            Subscribe to get access to exclusive discounts and offers.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-72 rounded-lg bg-gray-900 focus:outline-none text-gray-300"
              onChange={(e) => setsubscriptionEmail(e.target.value)}
            />
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              type="submit"
              onClick={(e) => handleSubscription(e)}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p>© 2024 PrismTech. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="mailto:sreenands93@gmail.com" className="hover:text-white transition">
              Gmail
            </a>

            <a href="https://www.linkedin.com/in/sreenand-s-9b2716292/" className="hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

