export function FeatureCard({ feature }) {
  return (
    <a
      href={feature.url}
      className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
    >
      <h3 className="text-2xl font-bold">{feature.title} &rarr;</h3>
      <p className="mt-4 text-xl">{feature.description}</p>
    </a>
  );
}
