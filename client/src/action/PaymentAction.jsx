import axios from "axios";

const checkoutUrl = "http://localhost:5000/api/create-checkout-session";

const makeCheckoutSessionRequest = async (requestData) => {
  try {
    const response = await axios.post(checkoutUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        data: error.response.data.error,
      };
    } else {
      return {
        success: false,
        data: "Something went wrong. Try again later!",
      };
    }
  }
};

export default makeCheckoutSessionRequest;
