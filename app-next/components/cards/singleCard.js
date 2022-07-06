export default function SingleCard({ person }) {
  return (
    <figure className="p-6 bg-white mt-6 text-left border w-96 rounded-xl hover:text-blue-600 shadow-lg shadow-zinc-300 focus:text-blue-600 h-auto mb-6 grayscale hover:grayscale-0">
      <img
        className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        src={person.photo}
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p className="text-lg font-medium">{person.intro}</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="card-role text-sky-500">{person.name}</div>
          <div className="text-slate-700">{person.job}</div>
        </figcaption>
      </div>
    </figure>
  );
}
