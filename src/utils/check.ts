import { Order } from "../interfaces";

export function downloadTextFile(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");

  // Create a link to the blob
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Simulate a click to download the file
  link.click();

  // Clean up by revoking the object URL
  URL.revokeObjectURL(link.href);
}

export function generateOrderCheck(order: Order): string {
  let checkText = `Order Summary for ${order.buyer_name}:\n`;
  checkText += `${"=".repeat(40)}\n`;
  checkText += `Order ID: ${order.id}\n`;
  checkText += `Package Code: ${order.package_code}\n`;
  checkText += `State Code: ${order.state_code}\n`;
  checkText += `${"=".repeat(40)}\n`;

  let totalPrice = 0;

  order.line_items.forEach((lineItem) => {
    const { product, qyt_ordened } = lineItem;
    const itemTotal = product.price * qyt_ordened;
    checkText += `Product: ${product.name}\n`;
    checkText += `Quantity: ${qyt_ordened}\n`;
    checkText += `Price per unit: $${product.price.toFixed(2)}\n`;
    checkText += `Item total: $${itemTotal.toFixed(2)}\n`;
    checkText += `${"-".repeat(40)}\n`;
    totalPrice += itemTotal;
  });

  checkText += `Total Price: $${totalPrice.toFixed(2)}\n`;
  checkText += `${"=".repeat(40)}\n`;

  return checkText;
}
