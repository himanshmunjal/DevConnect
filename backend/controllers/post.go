package controllers

import (
	"backend/config"
	"backend/models"
	"fmt"
	"net/http"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

func CreatePost(c *gin.Context) {
	title := c.PostForm("title")
	content := c.PostForm("content")
	postType := c.PostForm("type")
	userID := c.PostForm("user_id")

	file, _ := c.FormFile("image")
	var filePath string
	if file != nil {
		filename := fmt.Sprintf("%d_%s", time.Now().Unix(), filepath.Base(file.Filename))
		filePath = "uploads/" + filename
		if err := c.SaveUploadedFile(file, filePath); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save image"})
			return
		}
	}

	post := models.Post{
		UserID:  parseUint(userID),
		Title:   title,
		Content: content,
		Type:    postType,
		Image:   filePath,
	}

	if err := config.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"post": post})
}

func GetPosts(c *gin.Context) {
	var posts []models.Post
	if err := config.DB.Order("created_at desc").Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"posts": posts})
}

func parseUint(s string) uint {
	var id uint
	fmt.Sscanf(s, "%d", &id)
	return id
}
