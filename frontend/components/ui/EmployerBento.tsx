import React from "react";
import { useId } from "react";
 
export function EmployerBento() {
  return (
    <div className="py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative p-6 rounded-3xl overflow-hidden border border-[#846b8a] bg-[#2a273c]"
          >
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
const grid = [
  {
    title: "HIPAA and SOC2 Compliant",
    description:
      "Our applications are ",
  },
  {
    title: "Automated Social Media Posting",
    description:
      "Schedule and automate",
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain insights into ",
  },
//   {
//     title: "Content Calendar",
//     description:
//       "Plan and organize your social media content with an intuitive calendar view, ensuring you never miss a post.",
//   },
//   {
//     title: "Audience Targeting",
//     description:
//       "Reach the right audience with advanced targeting options, including demographics, interests, and behaviors.",
//   },
//   {
//     title: "Social Listening",
//     description:
//       "Monitor social media conversations and trends to stay informed about what your audience is saying and respond in real-time.",
//   },
//   {
//     title: "Customizable Templates",
//     description:
//       "Create stunning social media posts with our customizable templates, designed to fit your brand's unique style and voice.",
//   },
//   {
//     title: "Collaboration Tools",
//     description:
//       "Work seamlessly with your team using our collaboration tools, allowing you to assign tasks, share drafts, and provide feedback in real-time.",
//   },
];