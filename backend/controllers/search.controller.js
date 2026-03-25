import { fetchFromTMDB } from "../services/tmdb.services.js";
import { User } from "../models/user.model.js";

export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.lenght === 0) {
            return res.status(404).send(null);

        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),
                },
            },
        });


        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in the searchMovie Controller:", error.message);
        return res.status(500).json({ success: true, message: "Internal Server error in the Search Movie Controlller" });

    }
};






export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.lenght === 0) {
            return res.status(404).send(null);

        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),
                },
            },
        });


        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in the searchTv Controller:", error.message);
        return res.status(500).json({ success: true, message: "Internal Server error in the Search TV Controlller" });

    }

}






export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.lenght === 0) {
            return res.status(404).send(null);

        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                },
            },
        });


        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in the searchPerson Controller:", error.message);
        return res.status(500).json({ success: true, message: "Internal Server error in the Search Person Controlller" });

    }

};




export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};



export async function removeItemFromSearchHistory(req, res) {

    let { id } = req.params;
    id=parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });

        res.status(200).json({success:true,message:"Item Removed Successfully"});
    
        
    } catch (error) {
        console.log("Error in removeItemFromSearchHistory controller:",error.message);
    }
  
}