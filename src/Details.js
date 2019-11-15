import React from "react";
import pf from "petfinder-client";
import {nagivate} from "@reach/router/lib/history";
import Carousel from "./Carousal";

const petfinder = pf({
  key: process.env.API_KEY,
  seret: process.env.API_SECRET
});

class Details extends React.Component {
  state = {
    loading : true
  }

  componentDidMount() {
    petfinder.pet.get({ 
      output: "full",
      id : this.props.id,
    }).then(data => {
      const pet  = data.petfinder.pet;

      let breed;
      if(Array.isArray(data.petfinder.pet.breeds.breed)){
        breed = data.petfinder.pet.breeds.breed.join(', ');
      } else {
        breed = data.petfinder.pet.breeds.breed;
      }

      this.setState({
        name: pet.name,
        animal: pet.animal,
        location: `${pet.contact.city}, ${pet.contact.state}`,
        description: pet.description,
        media: pet.media,
        breed: breed,
        loading: false
      })
    }).catch(() => { 
      nagivate("/");
    });
  }

  render() {
    if(this.state.loading){
      return <h1>Loading...</h1>
    }

    const { name, animal, breed, location, description, media} = this.state;
    return (
      <div className="details">

        <Carousel media={media} />

        <div>
          <h1>{name}</h1>
          <h2>{animal} - {breed} - {location}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;