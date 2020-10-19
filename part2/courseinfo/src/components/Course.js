import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => (
  <div>
    {course.parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Total = ({ course }) => {
  const sum = course.parts.reduce((add, { exercises }) => add + exercises, 0);
  return <p style={{ fontWeight: "bold" }}>total of {sum} exercises</p>;
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

export default Course;
