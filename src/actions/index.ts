"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "<mailto:richardryangarcial@gmail.com>",
  "BHK_lJeuBGM6BY_a6k12BRnzBHbmhCtwczfbJGZJW_nf-cvCBDQgVtKFV-8QnDihclp8aZ8N6wPVlEMVVGYvs0g",
  "fGxJKeepoiKyvwNs4WWWn0gHlYGtizLAxoVyjQTcY-A"
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
