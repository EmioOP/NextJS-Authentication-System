export default async function UserProfile({ params }: { params: { id: string } }) {
  return (
    
    <div>
      <h1>Profile</h1>
      <hr />
      <p className="text-xl">
        Profile Page : <span className="bg-red-500">{params.id}</span>
      </p>
    </div>
  );
}

