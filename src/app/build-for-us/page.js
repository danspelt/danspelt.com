import BuildForUsClient from "./BuildForUsClient";

export const metadata = {
  title: "Custom Software Project Planner",
  description:
    "Explore a practical custom software idea for your business or organization based on the workflow, communication, and information problems you need to solve.",
  alternates: {
    canonical: "https://danspelt.com/build-for-us",
  },
  openGraph: {
    title: "Custom Software Project Planner | Dan Spelt",
    description: "Turn a workflow or communication problem into a practical custom software starting point.",
    url: "https://danspelt.com/build-for-us",
    images: ["/og.png"],
  },
};

export default function BuildForUsPage() {
  return <BuildForUsClient />;
}
