// RadioScene.js

class RadioScene extends Scene {
  create(key) {
    const data = this.engine.storyData.Locations[key];
    this.engine.show(data.Body);

    this.powered = false;
    const btn = document.createElement('button');
    btn.textContent = 'Turn On Radio';
    btn.style.margin = '8px';
    btn.onclick = () => {
      this.powered = !this.powered;
      btn.textContent = this.powered ? 'Turn Off Radio' : 'Turn On Radio';

      if (this.powered) {
        const messages = [
          "…static… “The forest awakens, do you hear it?”",
          "…crackle… “Seek the hidden chamber beneath the ruins…”",
          "…buzz… “Beware the shifting mist at midnight…”"
        ];
        this.engine.show(messages[Math.floor(Math.random()*messages.length)]);
      } else {
        this.engine.show("The radio falls silent.");
      }
    };
    document.body.appendChild(btn);

    for (const choice of data.Choices || []) {
      this.engine.addChoice(choice.Text, choice);
    }
  }

  handleChoice(choice) {
    document.querySelectorAll('button').forEach(b => b.remove());
    this.engine.show(`> ${choice.Text}`);

    const nextKey  = choice.Target;
    const nextNode = this.engine.storyData.Locations[nextKey];
    if (nextNode.hasRadio) {
      this.engine.gotoScene(RadioScene, nextKey);
    } else {
      this.engine.gotoScene(Location,   nextKey);
    }
  }
}

window.RadioScene = RadioScene;
