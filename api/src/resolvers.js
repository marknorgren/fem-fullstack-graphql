/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input);
    },
    pet(_, { input }, ctx) {
      return ctx.models.Pet.findOne(input);
    }
  },

  Mutation: {
    createPet(_, { input }, ctx) {
      const newPet = {
        name: input.name,
        type: input.type.toUpperCase()
      }
      return ctx.models.Pet.create(newPet)
    }
  },

  Pet: {
    // id(pet) {
    //   console.log(pet)
    //   return pet.id
    // }
    img(pet) {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },

    user(pet, {input}, ctx) {
      //console.dir(pet)
      //console.dir(input)
      //console.dir(ctx)
      return ctx.models.User.findOne()
    }
  },
  User: {
    pets(user, {input}, ctx) {
      return ctx.models.Pet.findMany()
    }
  }
};
