package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func FindUser(c *gin.Context) {
	name := c.Param("name")

	var users []models.User
	// ✅ Case-insensitive, partial match
	if err := config.DB.
		Where("LOWER(name) LIKE LOWER(?)", "%"+name+"%").
		Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}

// 🔹 Find profiles by partial project name (case-insensitive)
func FindProject(c *gin.Context) {
	query := strings.ToLower(c.Param("name"))
	var projects []models.Profile

	if err := config.DB.
		Where("LOWER(project_name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(tags) LIKE ?",
			"%"+query+"%", "%"+query+"%", "%"+query+"%").
		Find(&projects).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(projects) == 0 {
		c.JSON(http.StatusOK, []models.Profile{})
		return
	}

	c.JSON(http.StatusOK, projects)
}

// func FindPost(c *gin.Context) {
// 	query := strings.ToLower(c.Param("title"))
// 	var posts []models.Post

// 	if err := config.DB.
// 		Where("LOWER(title) LIKE ? OR LOWER(content) LIKE ?", "%"+query+"%", "%"+query+"%").
// 		Find(&posts).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if len(posts) == 0 {
// 		c.JSON(http.StatusOK, []models.Post{})
// 		return
// 	}

// 	c.JSON(http.StatusOK, posts)
// }