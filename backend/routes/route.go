package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
	// "golang.org/x/text/search"
	"backend/middleware"
)

func SetupRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/signup", controllers.Signup)
		auth.POST("/login", controllers.Login)
	}
	profile := r.Group("/profile")
	{
		profile.POST("/:id", controllers.UpdateProfile)
		profile.GET("/:id", controllers.FetchProfile)
		profile.PUT("/:id", controllers.ModifyProfile)
	}
	search := r.Group("/search")
	{
		search.GET("/name/:name", controllers.FindUser)
		search.GET("/project/:name", controllers.FindProject)
	}
	post := r.Group("/upload")
	{
		post.POST("/post/:user_id",middleware.AuthMiddleware(), controllers.CreatePost)
	}
}
