import { NextResponse } from "next/server";

export async function callService(url, method, data, headers) {
  // Set the options
  const options = {
    method: method,
    headers: headers,
  };

  if (["POST", "PUT", "UPDATE"].includes(method)) {
    options.body = JSON.stringify(data);
  }

  // Make the API call
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
