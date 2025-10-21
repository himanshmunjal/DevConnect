package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)


func SetupRoutes(r *gin.Engine) {
    auth := r.Group("/auth")
    {
        auth.POST("/signup", controllers.Signup)
        auth.POST("/login", controllers.Login)
        auth.GET("/profile/:id",controllers.FetchProfile)
    }
}
