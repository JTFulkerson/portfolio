import Image from "next/image";
import Navbar from "../navbar";

const About = () => {
    const projects: { imageUrl: string, title: string, description: string }[] = [
        {
            imageUrl: "/images/ud-sailing.jpg",
            title: 'University of Delaware Club Sailing Team',
            description: 'The University of Delaware Club Sailing Team is a collegiate sailing team that represents the University of Delaware in the Middle Atlantic Intercollegiate Sailing Association (MAISA) conference. The team is comprised of seasoned sailor as well as beginners who are passionate about the sport of sailing and committed to representing their school. As a crew member on the team, I have the opportunity to participate in exciting regattas and compete against other top collegiate sailing teams from across the East Coast. These regattas take place throughout the academic year and offer a unique and exhilarating experience for sailors of all skill levels.',
        },
    ];

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold mb-8">About Me</h1>
                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            className="flex rounded-lg overflow-hidden shadow-md"
                        >
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-1/3 object-cover"
                                width={1000}
                                height={1000}
                            />
                            <div className="p-6 w-2/3">
                                <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                                <p className="text-gray-600">{project.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default About;