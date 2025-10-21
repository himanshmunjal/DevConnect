package models

import (
	// Removed cyclic import of "backend/models"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model
	ID           uint           `json:"id" gorm:"not null;uniqueIndex"`
	Skills       pq.StringArray `json:"skills" gorm:"type:text[]"`
	Projects     pq.StringArray `json:"projects" gorm:"type:text[]"`
	Achievements pq.StringArray `json:"achievements" gorm:"type:text[]"`
	Innovations  pq.StringArray `json:"innovations" gorm:"type:text[]"`
	User         *User         `json:"-" gorm:"foreignKey:UserID"`
}
