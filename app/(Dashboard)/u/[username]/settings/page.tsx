import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

const SettingsPage = async() => {
    const self = await getSelf();
    const settings = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
      ];
      return (
        <div className="card-body">
          <h1 className="card-title">Settings</h1>
    
          <div className="form-control">
            <ul>
              {settings.map((setting, index) => (
                  <label className="label cursor-pointer gap-4">
                  <span className="label-text">{setting}</span>
                  <input type="radio" name="theme-radios" className="radio theme-controller" value={setting}/>
                </label>
              ))}
            </ul>
          </div>
        </div>
      );
    };1

export default SettingsPage;