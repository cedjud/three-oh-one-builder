import InputUrl from "../InputUrl";

const InputUrls = ({ urls }) => (
  <div className="input-urls">
    <ul>
      {urls.map((item, index) => (
        <InputUrl key={item + index} url={item} />
      ))}
    </ul>
  </div>
);

export default InputUrls;
