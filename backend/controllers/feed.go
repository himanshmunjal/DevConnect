package controllers

import (
	"backend/config"
	"backend/models"

	"github.com/gin-gonic/gin"
)

func Posts(c *gin.Context){
	var posts []models.Post

	if err:= config.DB.Preload("User").Order("created_at DESC").Find(&posts).Error; err!=nil{
		c.JSON(400, gin.H{
			"message": "Failed to fetch posts",
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "Posts fetched successfully",
		"posts": posts,
	})
}