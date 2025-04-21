// rules.js

class Start extends Scene {
    create() {
      this.engine.inventory = [];
      this.engine.setTitle(this.engine.storyData.Title);
      this.engine.addChoice("Begin the story");
    }
  
    handleChoice() {
      const key  = this.engine.storyData.InitialLocation;
      const node = this.engine.storyData.Locations[key];
      if (node.hasRadio) {
        this.engine.gotoScene(RadioScene, key);
      } else {
        this.engine.gotoScene(Location,   key);
      }
    }
  }
  
  class Location extends Scene {
    create(key) {
      const data = this.engine.storyData.Locations[key];
      this.engine.show(data.Body);
  
      if (data.ItemPickup) {
        this.engine.inventory.push(data.ItemPickup);
        this.engine.show(`(You picked up: ${data.ItemPickup})`);
      }
  
      if (data.Choices && data.Choices.length) {
        for (const choice of data.Choices) {
          if (choice.requiresItem
           && !this.engine.inventory.includes(choice.requiresItem)) {
            continue;
          }
          this.engine.addChoice(choice.Text, choice);
        }
      } else {
        this.engine.addChoice("The end.");
      }
    }
  
    handleChoice(choice) {
      if (!choice) return this.engine.gotoScene(End);
  
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
  
  class End extends Scene {
    create() {
      this.engine.show("<hr>");
      this.engine.show(this.engine.storyData.Credits);
    }
  }
  
  window.Start    = Start;
  window.Location = Location;
  window.End      = End;
  
  Engine.load(Start, 'myStory.json');
  