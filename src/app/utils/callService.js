// import { NextResponse } from "next/server";

// export async function callService(method, url, data, headers) {
//   // Set the options
//   const options = {
//     method: method,
//   };

//   if (headers) {
//     options.headers = {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     };
//   }

//   if (["POST", "PUT", "UPDATE"].includes(method)) {
//     options.body = JSON.stringify(data);
//   }

//   // Make the API call
//   try {
//     console.log(options);
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// }

/* eslint-disable no-console */
import axios from "axios";

export default async function callService(method, url, data, headers) {
  // headers["ngrok-skip-browser-warning"] = "skip-browser-warning";
  const response = await axios({
    method,
    headers,
    url,
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 500 || error.response.status === 302) {
          // router.push("/500");

          return "server error";
        }

        if (error.response.data.error) {
          return error.response.data.error;
        }

        if (error.response.data.detail) {
          return error.response.data.detail;
        }

        return error.response;
      }
      if (error.request) {
        return "request error";
      }

      return "has something error";
    });

  return response;
}
