package controllers

import (
	"backend/config"
	"backend/models"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func FetchProfile(c *gin.Context) {
	userId := c.Param("id")
	var user models.User
	result := config.DB.Preload("Profile").First(&user, "id = ?", userId)

	if result.Error != nil {
		if result.Error.Error() == "record not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error fetching profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"id":           user.ID,
		"name":         user.Name,
		"email":        user.Email,
		"tagline":      user.Profile.Tagline,
		"skills":       user.Profile.Skills,
		"projects":     user.Profile.Projects,
		"achievements": user.Profile.Achievements,
		"innovations":  user.Profile.Innovations,
		"aboutme":      user.Profile.Aboutme,
	})
}

func UpdateProfile(c *gin.Context) {
	userIdStr := c.Param("id")
	userID, err := strconv.ParseUint(userIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var input struct {
		Tagline      string   `json:"tagline"`
		Skills       []string `json:"skills"`
		Projects     []string `json:"projects"`
		Achievements []string `json:"achievements"`
		Innovations  []string `json:"innovations"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON input"})
		return
	}

	var profile models.Profile
	result := config.DB.Where("user_id = ?", userID).First(&profile)

	if result.RowsAffected == 0 {
		profile = models.Profile{
			UserID:       uint(userID),
			Skills:       input.Skills,
			Projects:     input.Projects,
			Achievements: input.Achievements,
			Innovations:  input.Innovations,
		}

		if err := config.DB.Create(&profile).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create profile"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Profile created successfully"})
		return
	}

	profile.Skills = input.Skills
	profile.Projects = input.Projects
	profile.Achievements = input.Achievements
	profile.Innovations = input.Innovations

	if err := config.DB.Save(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}

func ModifyProfile(c *gin.Context) {
	userIdStr := c.Param("id")
	userID64, err := strconv.ParseUint(userIdStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	userID := uint(userID64)

	// Use pointers to detect which fields are actually sent
	var input struct {
		Aboutme      *string   `json:"about"`
		Tagline      *string   `json:"tagline"`
		Skills       *[]string `json:"skills"`
		Projects     *[]string `json:"projects"`
		Achievements *[]string `json:"achievements"`
		Innovations  *[]string `json:"innovations"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON input"})
		return
	}

	var profile models.Profile

	err = config.DB.Where("user_id = ?", userID).First(&profile).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		// Create new profile with provided fields
		newProfile := models.Profile{
			UserID: userID,
		}

		// Only set fields that were provided
		if input.Tagline != nil {
			newProfile.Tagline = *input.Tagline
		}
		if input.Skills != nil {
			newProfile.Skills = *input.Skills
		}
		if input.Projects != nil {
			newProfile.Projects = *input.Projects
		}
		if input.Achievements != nil {
			newProfile.Achievements = *input.Achievements
		}
		if input.Innovations != nil {
			newProfile.Innovations = *input.Innovations
		}

		if err := config.DB.Create(&newProfile).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create profile"})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"message": "Profile created successfully",
			"profile": newProfile,
		})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error: " + err.Error()})
		return
	}

	// Only update fields that were provided (not nil)
	if input.Aboutme != nil {
		profile.Aboutme = *input.Aboutme
	}
	if input.Tagline != nil {
		profile.Tagline = *input.Tagline
	}
	if input.Skills != nil {
		profile.Skills = *input.Skills
	}
	if input.Projects != nil {
		profile.Projects = *input.Projects
	}
	if input.Achievements != nil {
		profile.Achievements = *input.Achievements
	}
	if input.Innovations != nil {
		profile.Innovations = *input.Innovations
	}

	if err := config.DB.Save(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Profile updated successfully",
		"profile": profile,
	})
}
