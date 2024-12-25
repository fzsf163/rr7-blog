import "./inputField.css";

export default function RequestForm() {
  return (
    <div className="space-y-20">
      <div className="input-container">
        <input
          placeholder="Enter your name"
          className="input-field"
          type="text"
          id="inputName"
          name="name"
          required
        />
        <label htmlFor="inputName" className="input-label peer capitalize">
          What Should We Call you
        </label>
        <span className="input-highlight"></span>
      </div>
      <div className="input-container">
        <input
          placeholder="Enter your email"
          className="input-field"
          type="email"
          id="inputEmail"
          name="email"
          required
        />
        <label htmlFor="inputEmail" className="input-label peer capitalize">
          How do we reach you?
        </label>
        <span className="input-highlight"></span>
      </div>
      <div className="input-container">
        <textarea
          placeholder="Enter your request"
          className="input-field h-[10rem] resize-none"
          id="inputRequest"
          name="requestDetails"
          required
        />
        <label htmlFor="inputRequest" className="input-label peer capitalize">
          tell us what you would like to read
        </label>
        <span className="input-highlight"></span>
      </div>
    </div>
  );
}
