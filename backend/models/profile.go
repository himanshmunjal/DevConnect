package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model // Provides ID, CreatedAt, UpdatedAt, DeletedAt

	Skills       pq.StringArray `json:"skills" gorm:"type:text[]"`
	Projects     pq.StringArray `json:"projects" gorm:"type:text[]"`
	Achievements pq.StringArray `json:"achievements" gorm:"type:text[]"`
	Innovations  pq.StringArray `json:"innovations" gorm:"type:text[]"`
	Tagline      string         `json:"tagline"`
	UserID       uint           `json:"user_id"`
	Aboutme      string         `json:"aboutme"`
	User         *User          `json:"-" gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE;"`
}
