package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FetchProfile(c *gin.Context) {
	userId := c.Param("id")

	var user models.User
	if err := config.DB.Preload("Profile").First(&user, userId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":           user.ID,
		"name":         user.Name,
		"email":        user.Email,
		"tagline":      user.Tagline,
		"skills":       user.Profile.Skills,
		"projects":     user.Profile.Projects,
		"achievements": user.Profile.Achievements,
		"innovations":  user.Profile.Innovations,
	})
}

func ModifyProfile(c *gin.Context){
	userId := c.Param("id")

	var user models.User
	if err := config.DB.Preload("Profile").First(&user, userId).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
}