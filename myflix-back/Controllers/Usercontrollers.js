const User = require("../Models/Usermodel");

module.exports.addtolikedmovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      console.log('User already exists');
      const { likedmovies } = user;
      console.log(likedmovies);

      // Check if the movie with the same ID is already liked
      const movieAlreadyLiked = likedmovies.some(movie => movie.id === data._id);

      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $push: { likedmovies: data }, // Use $push to add the movie to the array
          },
          { new: true }
        );
        res.json({ msg: "Movie added to likedmovies" });
      } else {
        res.json({ msg: "Movie already added" });
      }
    } else {
      await User.create({ email, likedmovies: [data] });
      res.json({ msg: "User created and movie added to likedmovies" });
    }
  } catch (err) {
    console.error(err);
    return res.json({ msg: "Error adding movie" });
  }
};
module.exports.getlikedmovies = async (req, res) => {
console.log("triggering")
  try{
    const email= req.params.email;
    console.log(email)
    const user = await User.findOne({ email });
    if(user){
      res.json({msg:"success",movies:user.likedmovies})
    }
    else{
      return res.json({msg:"user not found"})
    }
  }
  catch(err){
    console.log(err)
    return res.json({msg:"error occured"})
  }
}