import "./TestimonialsDashboard.css";

const testimonials = [
  {
    quote:
      "I've found this technology to be the best on the market today to sustain a very high load of requests.",
    name: "Robert Rizk",
    role: "Co-Founder and COO of Blackbox AI",
  },
  {
    quote:
      "CodeSandbox SDK provides the critical dev environment infrastructure that brings our vision to life.",
    name: "Ran Ma",
    role: "Co-Founder & CTO of Superblocks",
  },
  {
    quote:
      "Its dramatically improved the experience of sharing and working with code.",
    name: "Brian Vaughn",
    role: "Software Engineer, React",
  },
  {
    quote:
      "It's a great experience and I miss some of the features when developing in VS Code.",
    name: "Edwin Webb",
    role: "Senior Software Engineer",
  },
  {
    quote:
      "The new CodeSandbox is the first online editor I can see myself using to build a full project.",
    name: "Matthew Phillips",
    role: "Co-creator of Astro",
  },
  {
    quote:
      "It's such a huge productivity boost.",
    name: "Dominik",
    role: "Frontend Tech Lead at Adverity",
  },



];

export function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-track">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <article className="testimonial-card" key={index}>
            <p className="testimonial-quote">
              {testimonial.quote}
            </p>

            <div className="testimonial-author">
              

              <div>
                <div className="testimonial-name">
                  {testimonial.name}
                </div>

                <div className="testimonial-role">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
    
  );
}