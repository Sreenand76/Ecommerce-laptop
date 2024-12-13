import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})
export const laptop = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/laptops`
})
export const user = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`
})

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization : `Bearer ${token}`,
  }
}

export const getAllLaptops = async () => {
  try {
    const response = await laptop.get("/all", {
      headers: getHeader()
    });

    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getLaptopById = async (laptopId) => {
  try {
    const response = await laptop.get(`/${laptopId}`, {
      headers: getHeader()
    });
    return response.data
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function registerUser(registration) {
  try {
    const response = await api.post("auth/register-user", registration);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data)
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
    return null;
  }
}
export const getUserDetails = async (email) => {
  try {
    const response = await user.get(`/${email}`, {
      headers: getHeader()
    });
    return response.data
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export const updateUserDetails = async (email,UserDetails) => {
  try {
    console.log(UserDetails)
    const response = await user.put(`update/${email}`,UserDetails,{
      headers: getHeader()
    });
    return response.data
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function getAllBrands() {
  try {
    const response = await laptop.get("/AllBrands");
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
    return null;
  }
}

export async function getFeaturedLaptops() {
  try {
    const response = await laptop.get("/featured")
    return response.data;
  } catch (error) {
    console.error("Failed to fetch laptops:", error);
  }
};

export async function AddLaptopAdmin(laptopDetails) {
  try {
    const response = await laptop.post("/add/laptop",laptopDetails, {
      headers:getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update laptop:", error);
    throw error;
  }
}

export async function UpdateLaptopfetchedById(id, laptopDetails) {
  try {
    const response = await laptop.put(`/update/${id}`, laptopDetails, {
      headers:getHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update laptop:", error);
    throw error;
  }
}

export async function deleteLaptopById(id) {
  try {
    await laptop.delete(`/delete/${id}`, {
      headers:getHeader(),
    });
  } catch (error) {
    console.error("Failed to delete laptop:", error);
    throw error;
  }
}

export async function addToWishList(userId, laptopId) {
  try {
    await user.post(`/wishlist/${userId}/${laptopId}`,{},{
      headers:getHeader()
    });
   
  } catch (error) {
    console.error("Failed to add to wishlist:", error);
    throw error;
  }
}

export async function getUserWishList(userId) {
  try {
    const response = await user.get(`/wishlist/${userId}`,{
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user wishlist:", error);
    throw error;
  }
}

export async function RemoveItemFromWishList(userId, laptopId) {
  try {
    await user.delete(`/wishlist/remove/${userId}/${laptopId}`,{
      headers:getHeader()
    });
  } catch (error) {
    console.error("Failed to remove item wishlist:", error);
    throw error;
  }
}

export async function addToUserCart(userId, laptopId,cartItem) {
  try {
    await user.post(`/cart/add/${userId}/${laptopId}`,cartItem,{
      headers:getHeader()
    });   
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
}

export async function getUserCartItems(userId) {
  try {
    const response = await user.get(`/cart/${userId}`,{
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user cartitems:", error);
    throw error;
  }
}

export async function RemoveItemFromCart(userId,laptopId,cartItem) {
  try {
    await user.delete(`/cart/remove/${userId}/${laptopId}?color=${cartItem.color}&ram=${cartItem.ram}&storage=${cartItem.storage}&quantity=${cartItem.quantity}`,{
      headers:getHeader()
    });
  } catch (error) {
    console.error("Failed to remove item wishlist:", error);
    throw error;
  }
}
export async function createOrder(userId,OrderDetails) {
  try {
    await user.post(`/add/order/${userId}`,OrderDetails,{
      headers:getHeader()
    });   
  } catch (error) {
    console.error("Failed to create new order:", error);
    throw error;
  }
}

export async function getUserOrders(userId) {
  try {
    const response = await user.get(`/orders/${userId}`,{
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    throw error;
  }
}

export async function CancelOrder(orderId) {
  try {
    await user.delete(`cancel/order/${orderId}`,{
      headers:getHeader()
    });
  } catch (error) {
    console.error("Failed to remove order:", error);
    throw error;
  }
}

export async function Subscription(email) {
  try {
    const response = await api.post(`/subscriptions`,{email},{
      headers:getHeader()
    });
    if (response.data) {
      return true;  
    } else{
      return false;
    }
  } catch (error) {
    console.error("Failed to add subscription:", error);
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const response = await user.get(`/orders/all`,{
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
}

export async function updateOrder(id,status) {
  try {
    const response = await user.put(`/orders/${id}/${status}`,{},{
      headers:getHeader()
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update order:", error);
    throw error;
  }
}

export async function getAllUser(){
  try{
    const response=await user.get("/all",{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function deleteUser(userId){
  try{
    const response=await user.delete(`/delete/${userId}`,{
      headers:getHeader()
    })
    return response.data;
  }catch(error){
    throw error;
  }
}
export async function updateUserRole(userId, roleName) {
  try {
    const response = await user.put(`/${userId}/roles/${roleName}`, {}, {
      headers: getHeader()
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}